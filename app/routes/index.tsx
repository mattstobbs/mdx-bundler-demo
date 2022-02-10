import { json, LoaderFunction, useLoaderData } from 'remix';
import { getMdxPage, useMdxComponent } from '~/utils/mdx';

interface LoaderData {
  page: Awaited<ReturnType<typeof getMdxPage>>;
}

export const loader: LoaderFunction = async () => {
  const page = await getMdxPage();

  const data: LoaderData = {
    page,
  };
  return json(data, { status: 200 });
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  const { code, frontmatter } = data.page;

  const Component = useMdxComponent(code);

  return <Component />;
}
