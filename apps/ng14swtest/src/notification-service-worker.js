/**
 * WorkerGlobalScope에서 동작하는 코드임. 컨텍스트에 대한 정보는 아래 문서 참고할 것
 * https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope
 *
 * ngsw-worker.js 는 angular.json의 빌더 설정에 "serviceWorker" "ngswConfigPath"
 * 값이 설정되어 있으면 빌드 완료 후 자동으로 생성되는 Angular의 서비스 워커 구현 스크립트임
 */

const icon = './assets/logo.png';

/**
 * Angular의 SwPush 서비스를 이용해 생성한 구독은 아래 인스턴스의 형대로 저장됨
 * https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription
 *
 *
 * 서버에서 각 이벤트 발생 시 `web-push`라이브러리를 사용해 위에서 만든 구독 정보로
 * 데이터를 보내는데. 해당 구독 정보와 매칭되는 웹 워커에서 아래 이벤트가 발생함
 * https://developer.mozilla.org/en-US/docs/Web/API/PushEvent
 */
self.addEventListener('push', (e) => {
  const { title, body, ...data } = e.data.json();

  if (!title || !body) {
    return;
  }

  self.registration.showNotification(title, { body, icon, data });
});

self.addEventListener('notificationclick', (e) => {
  const url = e.notification?.data?.url;

  if (!url) {
    return;
  }

  self.clients.openWindow(url);
});
