## Vailla

Nuxt Typescript 공식 문서에 있는 [Vanilla](https://typescript.nuxtjs.org/cookbook/store#vanilla)를 채택했습니다.

### 채택한 이유

1. Class-based 방식을 채택하고 싶었지만 vue3 이상에서만 가능함
2. 이전 버전을 설치하면 되지만, vue2 LTS버전이 없음

## Access Store

[nuxt-typed-store](https://typed-vuex.roe.dev/getting-started/getting-started-nuxt)를 사용합니다.

### 채택한 이유

1. Typescript처럼 컴파일 타임에 타입을 확인하고 검사할 수 있음
