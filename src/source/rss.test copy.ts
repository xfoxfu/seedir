import { AcgRipRssSource, DmhyRssSource } from "./rss.js";
import test from "ava";
import fs from "fs/promises";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  http.get("https://acg.rip/page/1.xml", async () => {
    return HttpResponse.arrayBuffer(await fs.readFile("assets/test/acgrip.rss.xml"));
  }),
  http.get("https://share.dmhy.org/topics/rss/page/1/rss.xml", async () => {
    return HttpResponse.arrayBuffer(await fs.readFile("assets/test/dmhy.rss.xml"));
  }),
);

test.before(() => server.listen());
test.afterEach(() => server.resetHandlers());
test.after(() => server.close());

test("can parse rss field (ACG.RIP)", async (t) => {
  const source = new AcgRipRssSource();
  const content = await source.getPage(1);
  t.is(content.length, 3);
  t.true(
    content.every(
      (i) =>
        i.title &&
        i.source_link &&
        i.torrent_link &&
        i.published_at &&
        i.source_link.startsWith("https://acg.rip/t/") &&
        i.torrent_link.match(/https:\/\/acg.rip\/t\/\d+.torrent/),
    ),
  );
  t.is(content[0]?.title, "[YYSUB-RAW]Chibi Maruko-chan II 樱桃小丸子[1434][2024.06.09][AVC][1080P][FOD]");
  t.is(content[0]?.source_link, "https://acg.rip/t/305824");
  t.is(content[0]?.torrent_link, "https://acg.rip/t/305824.torrent");
  t.deepEqual(content[0]?.published_at, new Date(1717930318000));
});

test("can parse rss field (dmhy)", async (t) => {
  const source = new DmhyRssSource();
  const content = await source.getPage(1);
  t.is(content.length, 3);
  t.true(
    content.every(
      (i) =>
        i.title &&
        i.source_link &&
        i.torrent_link &&
        i.published_at &&
        i.source_link.startsWith("http://share.dmhy.org/topics/view/"),
    ),
  );
  t.is(content[0]?.title, "[YYSUB-RAW]Chibi Maruko-chan II 樱桃小丸子[1434][2024.06.09][AVC][1080P][FOD]");
  t.is(
    content[0]?.source_link,
    "http://share.dmhy.org/topics/view/671696_YYSUB-RAW_Chibi_Maruko-chan_II_1434_2024_06_09_AVC_1080P_FOD.html",
  );
  t.is(content[0]?.torrent_link, "https://dl.dmhy.org/2024/06/09/b8de2f71ae5acefa1d6ad16edf8b9419a22871fe.torrent");
  t.deepEqual(content[0]?.published_at, new Date(1717930319000));

  t.is(content[1]?.torrent_link, "https://dl.dmhy.org/2024/06/09/264a978050e9c1ca71e4bef790ceb744b971fa15.torrent");
  t.is(content[2]?.torrent_link, "https://dl.dmhy.org/2024/06/08/c1bfad08a99ac2ea25476dbd183ea51742b7f53c.torrent");
});
