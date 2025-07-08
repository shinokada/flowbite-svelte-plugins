const json = (r: Response) => r.json();
export const prerender = true;
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch }) => {
  try {
    const allExamples = await fetch("/api").then(json);
    // console.log('allExamples in layout server: ', allExamples)
    return {allExamples};
  } catch (error) {
    console.error(`Error in load function for /: ${error}`);
  }
};
