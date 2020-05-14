import React, { useState } from 'react';
// styles
import './ImageLoader.css';

const _loaded = {};

//define our loading and loaded image classes
const defaultProps = {
  loadingClassName: "img-loading",
  loadedClassName: "img-loaded"
};

export function ImageLoader({ src, alt }) {
  const [loaded, setLoaded] = useState(src);
  const { loadedClassName, loadingClassName } = defaultProps;

  //image onLoad handler to update state to loaded
  const onLoad = () => {
    _loaded[src] = true;
    setLoaded(true);
  };

  const className = `${loaded ? loadedClassName : loadingClassName}`;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onLoad={onLoad}
    />
  );
}
