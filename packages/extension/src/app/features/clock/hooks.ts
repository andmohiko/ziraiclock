import { useEffect, useState } from 'react';
import { Zirai } from '../../entities/Zirai';
import { fetchZirai } from '../../infrastructure/ZiraiOperations';
import { errorMessage } from '../../../utils/errorMessage';

export const useZirai = (): [Zirai | undefined, boolean, string | undefined] => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [zirai, setZira] = useState<Zirai | undefined>(undefined);

  useEffect(() => {
    const func = async () => {
      try {
        setLoading(true);
        const data = await fetchZirai();
        setZira(data);
      } catch (e) {
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    func();
  }, []);

  return [zirai, loading, error];
};
