import { useMemo } from 'react';
import * as mdxBundler from 'mdx-bundler/client';
import { compileMdx } from './compileMdx.server';

export async function getMdxPage() {
  const compiledPage = await compileMdx();

  return compiledPage;
}

function getMdxComponent(code: string) {
  const Component = mdxBundler.getMDXComponent(code);
  function mdxComponent({
    components,
    ...rest
  }: Parameters<typeof Component>['0']) {
    return <Component components={{ ...components }} {...rest} />;
  }
  return mdxComponent;
}

export function useMdxComponent(code: string) {
  return useMemo(() => getMdxComponent(code), [code]);
}
