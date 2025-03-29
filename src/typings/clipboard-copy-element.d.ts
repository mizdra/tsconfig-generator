// patch for https://stackoverflow.com/questions/79341174/react-19-typescript-add-typeof-web-component

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      ['clipboard-copy']: globalThis.JSX.IntrinsicElements['clipboard-copy'];
    }
  }
}

export {};
