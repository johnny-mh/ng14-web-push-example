# Angular 웹 푸시 테스트

## 개발서버 실행

### 환경변수 설정

```bash
# 의존 모듈 설치
npm install


# 웹 푸시 키 생성
npx web-push generate-vapid-keys

=======================================

Public Key:
{VAPID 공개키}

Private Key:
{VAPID 비밀키}

=======================================
```

공개키는 `environment.ts`에 추가한다

```ts
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  VAPIDPublicKey: '{VAPID 공개키}',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
```

리포지토리 루트에 `.env` 파일을 만들고 공개키, 비밀키 둘 다 등록한다

```bash
VAPID_PUBLIC_KEY={VAPID 공개키}
VAPID_PRIVATE_KEY={VAPID 비밀키}
```

### 서버 실행

```bash
npx nx run serve-ssr
```

실행 후 http://localhost:8080 접속해서 테스트 가능

구독 버튼을 누르면 브라우저 알림 권한 획득을 위한 확인이 뜨고. 허용하면 5초 후에 웹 푸시가 전송되도록 구현되어 있다.
