import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: "**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "The description of the post",
      required: false,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    published: {
      type: "boolean",
      default: false,
    },
    id: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      default: [],
      of: { type: "string" },
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: post => `/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
});
