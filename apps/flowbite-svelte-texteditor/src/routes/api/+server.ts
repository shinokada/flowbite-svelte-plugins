// import { fetchMarkdownPosts, fetchApiCheck } from "../utils";
import { json } from "@sveltejs/kit";

const convertPath = (path: string): string => {
  return path.replace('/src/routes', '').replace('.svelte', '');
};

const getLabel = (path: string): string => {
  return path.split('/').pop()?.replace('.svelte', '') || '';
};

const fetchExamples = async () => {
  const exampleFiles = import.meta.glob("/src/routes/examples/*.svelte");

  const iterableExampleFiles = Object.entries(exampleFiles);
  const allExamples = await Promise.all(
    iterableExampleFiles.map(async ([path, _]) => {
      return {
        label: getLabel(path),
        path: convertPath(path)
      };
    })
  );
  // console.log('server: ', allExamples)
  return allExamples;
};

export const GET = async () => {
  const allExamples = await fetchExamples();
  return json(allExamples);
};
