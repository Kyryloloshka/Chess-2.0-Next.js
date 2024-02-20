import { useEffect } from 'react';

const usePointerMove = (callback: (event: MouseEvent) => void) => {
  useEffect(() => {
    const handlePointerMove = (event: MouseEvent) => {
      callback(event);
    };

    document.body.addEventListener('pointermove', handlePointerMove);

    return () => {
      document.body.removeEventListener('pointermove', handlePointerMove);
    };
  }, [callback]);
};

export default usePointerMove;