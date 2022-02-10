import { bundleMDX } from 'mdx-bundler';

const mdxSource = `
---
title: Example Post
published: 2021-02-13
description: This is some description
---

# Wahoo

import Demo from './demo'

Here's a **neat** demo:

<Demo />
`.trim();

export async function compileMdx() {
  try {
    const result = await bundleMDX({
      source: mdxSource,
      files: {
        './demo.tsx': `
    import * as React from 'react'
    
    function Demo() {
      return <div>Neat demo!</div>
    }
    
    export default Demo
        `,
      },
    });

    return result;
  } catch (error: unknown) {
    throw error;
  }
}
