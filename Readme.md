# vk-ts
VK Mini Core shared JS libs


## Установка
```
npm i github:levtsypanov/vkts --save
```

## Использование

Services libs
```jsx
import { createStatEventsInstance } from '@mini-core/vkts/libs';
```

Utils
```jsx
import { getNiceDate } from "@mini-core/vkts";
```

> **Warning**
> When connecting a language module, use a global import of the form:
> `import "@mini-core/vkts/dist/cjs/types/getLangKey.ts";`