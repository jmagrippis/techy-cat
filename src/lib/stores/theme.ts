import {writable} from 'svelte/store'

import type {Theme} from 'src/types'

export const theme = writable<Theme>('auto')
