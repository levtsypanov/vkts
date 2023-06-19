import { useMemo } from 'react';
import { getLaunchParams } from './getLaunchParams';

export function useLaunchParams() {
    return useMemo(() => (
        getLaunchParams()
    ), []);
}
