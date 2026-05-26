import fs from "node:fs";
import path from "node:path";
import { notFound, redirect } from "next/navigation";

type Props = {
  params: Promise<{ path: string[] }>;
};

export default async function CatchAllPage({ params }: Props) {
  const { path: segments } = await params;
  const requested = segments.join("/");

  const target = requested.endsWith(".html") ? requested : `${requested}.html`;
  const diskPath = path.join(process.cwd(), "public", target);

  if (!fs.existsSync(diskPath)) notFound();
  redirect(`/${target}`);
}

