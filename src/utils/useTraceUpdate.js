import { useRef, useEffect } from 'react';

export default function useTraceUpdate(props, component='') {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log(
        'Changed Props', component ? `in ${component}:` : ':', changedProps
      );
    }
    prev.current = props;
  });
}
