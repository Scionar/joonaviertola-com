import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { DateTime } from "luxon";

const postsDirectory = path.join(process.cwd(), "content/posts");
const singlePagesDirectory = path.join(process.cwd(), "content/pages");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData: any[] = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    if (!matterResult.data.date) {
      throw new Error(`Date metadata not set in ${id}.md file`);
    }

    const humanDate = DateTime.fromISO(matterResult.data.date, {
      zone: "utc",
    }).toFormat("yyyy LLL dd");

    // Combine the data with the id
    return {
      id,
      humanDate,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  if (!matterResult.data.date) {
    throw new Error(`Date metadata not set in ${id}.md file`);
  }

  const humanDate = DateTime.fromISO(matterResult.data.date, {
    zone: "utc",
  }).toFormat("yyyy LLL dd");

  return {
    id,
    contentHtml,
    humanDate,
    ...matterResult.data,
  };
}

export async function getSinglePageData(id: string) {
  const fullPath = path.join(singlePagesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
