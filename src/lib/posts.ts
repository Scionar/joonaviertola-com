import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { DateTime } from "luxon";

const postsDirectory = path.join(process.cwd(), "content/posts");
const singlePagesDirectory = path.join(process.cwd(), "content/pages");

export function getAllFrontpagePosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    if (!matterResult.data.date) {
      throw new Error(`Date metadata not set in ${fileName}.md file`);
    }

    const humanDate = DateTime.fromISO(matterResult.data.date, {
      zone: "utc",
    }).toFormat("yyyy LLL dd");

    const slug = fileName.split(".")[0];

    return {
      slug: slug,
      date: matterResult.data.date,
      humanDate,
      title: matterResult.data.title,
      description: matterResult.data.description,
    };
  });

  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllSlugs() {
  const pageFileNames = fs.readdirSync(singlePagesDirectory);
  const postFileNames = fs.readdirSync(postsDirectory);

  const allFileNames = [...pageFileNames, ...postFileNames];

  const posts = allFileNames.map((filePath) => ({
    slug: filePath.split(".")[0],
  }));

  return posts;
}

export async function getPostBySlug(slug: string) {
  let fullPath = "";

  if (fs.existsSync(path.join(singlePagesDirectory, `${slug}.md`))) {
    fullPath = path.join(singlePagesDirectory, `${slug}.md`);
  }

  if (fs.existsSync(path.join(postsDirectory, `${slug}.md`))) {
    fullPath = path.join(postsDirectory, `${slug}.md`);
  }

  if (!fullPath) {
    throw Error(`Slug ${slug} coud not be found`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  const humanDate = DateTime.fromISO(matterResult.data.date, {
    zone: "utc",
  }).toFormat("yyyy LLL dd");

  return {
    slug,
    date: matterResult.data.date,
    humanDate,
    title: matterResult.data.title,
    contentHtml,
    ...matterResult.data,
  };
}

export function getMetadataBySlug(slug: string) {
  let fullPath = "";

  if (fs.existsSync(path.join(singlePagesDirectory, `${slug}.md`))) {
    fullPath = path.join(singlePagesDirectory, `${slug}.md`);
  }

  if (fs.existsSync(path.join(postsDirectory, `${slug}.md`))) {
    fullPath = path.join(postsDirectory, `${slug}.md`);
  }

  if (!fullPath) {
    throw Error(`Slug ${slug} coud not be found`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return {
    slug,
    title: matterResult.data.title,
    descrition: matterResult.data.description,
  };
}
