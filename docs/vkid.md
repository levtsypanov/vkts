### библиотека VK ID

Использование `request` модуля:

```tsx
import { request } from '@mini-core/vkts/dist/vkid/UrlUtils';

function ConnectEnterPassword() {
    const onEnter = (password: string) => {
      store.password = password;

      request(`https://${store.domains.login}/`, {
        'act': 'connect_authorize',
        'username': store.phone,
        'password': password,
        'access_token': store.access_token,
        'sid': store.sid,
        'app_id': store.app_id,
        'lg_h': store.init.lg_h,
        'uuid': store.init.uuid,
      }).then((result) => {
        this.sendResponseOut(result);
      }).catch(console.error);
    };

    return <ConnectEnterPassword
      user={{
        firstName: store.user.first_name,
        lastName: store.user.last_name,
        phone: store.user.phone || store.phone,
        avatar: store.user.photo_200,
      }}
      onEnter={onEnter}
    />;
}
```

Использование `api` модуля:

```tsx
import { request } from '@mini-core/vkts/dist/vkid/API';

  function startCountDown() {
    this.startTimer = Date.now();
    clearTimeout(this.setTimeoutId);
    this.setTimeoutId = setTimeout(this.tick.bind(this), 1000) as any;
  }

  function LoginEnterPhone() {
    const onContinueClick = (phone: string) => {
      api('auth.validatePhone', {
        device_id: store.device_id,
        lang: 'en',
        phone: phone,
      }).then((res) => {
        console.log(res);
        if (res.error || !res.response.sid) {
          return;
        }

        store.phone = phone;
        store.sid = res.response.sid;
        this.automaton.transition(Signals.GO_LOGIN_CONFIRM_PHONE);
        this.startCountDown(); // вынести в sideEffect
      }).catch(console.error);
    };

    return <LoginEnterPhone
      service={{
        loginCaption: `Вход в ${store.app.name}`,
        logo: store.app.photo,
      }}
      onContinue={onContinueClick}
    />;
}
```

Использование `setApiConfig` модуля:

```tsx
import { setApiConfig } from '@mini-core/vkts/dist/vkid/API';

useEffect(() => {
  this.automaton.transition(Signals.INIT);

  const init = (window as any).init as AppInit;
  const { uuid, v, app_id: appId, domains, app } = init;

  store.app = app;
  store.domains = domains;

  fetch(`https://${domains.login}/?act=connect&response_type=access_token&uuid=${uuid}&app_id=${appId}&v=${v}`, {
    mode: 'cors',
    credentials: 'include',
  })
  .then((res) => res.json())
  .then((data) => {
    setApiConfig({
      domain: domains.api,
      accessToken: data.access_token as string,
      appId: +appId,

      onCaptcha: (data, callback) => {
        this.setCaptcha(data, callback);
      },
    });

    store.access_token = data.access_token;
    store.device_id = Math.random();
    store.app_id = appId;
    store.init = init;

    if (data.auth) {
      store.user = data.user;
      store.auth = data;
      this.automaton.transition(Signals.GO_LOGIN_CONNECT_OR_PHONE);
    } else {
      this.automaton.transition(Signals.GO_LOGIN_ENTER_PHONE);
    }
  })
  .catch((err) => console.error(err));
})
```

Использование `CaptchaData`, `CaptchaResult` модулей:

```tsx
import { CaptchaData, CaptchaResult } from '@mini-core/vkts/dist/vkid/API';

function setCaptcha(data: CaptchaData, callback: (result: CaptchaResult) => void) {
    const onSubmit = (key: string) => {
      this.setState({ captcha: null });
      callback({
        captcha_key: key,
        captcha_sid: data.captcha_sid,
      });
    };

    const captcha = <Captcha
      code={data.captcha_sid}
      image={data.captcha_img}
      onSubmit={onSubmit}
    />;

    this.setState({ captcha });
  }

```