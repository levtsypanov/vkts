import { BridgePlus } from '@happysanta/bridge-plus';

export enum TargetType {
    SHARE_FACEBOOK = 'share_facebook',
    SHARE_TELEGRAM = 'share_telegram',
    SHARE_TWITTER = 'share_twitter',
    SHARE_ODNOKLASSNIKI = 'share_odnoklassniki',
    COPY_BUTTON = 'copy_button',
    COPY_INPUT = 'copy_input',
  }

const context = window as any;

let sendTarget: (event: TargetType) => void;

if (BridgePlus.supports('VKWebAppRetargetingPixel')) {
  sendTarget = (event) => {
    BridgePlus.send('VKWebAppRetargetingPixel', {
      pixel_code: process.env.REACT_APP_VK_PIXEL ?? '',
      event,
    });
  };
} else {
  if (!context.VK) {
    context.VK = {};

    const onload = () => {
      // eslint-disable-next-line new-cap
      context.VK.Retargeting.Init(process.env.REACT_APP_VK_PIXEL);
      // eslint-disable-next-line new-cap
      context.VK.Retargeting.Hit();
    };

    const onerror = () => {
      const img = Object.assign(document.createElement('img'), {
        loading: 'eager',
        importance: 'low',
        src: `https://vk.com/rtrg?p=${process.env.REACT_APP_VK_PIXEL}`,
      });

      img.style.position = 'fixed';
      img.style.left = '-999px';

      document.body.appendChild(img);
    };

    document.body.appendChild(Object.assign(document.createElement('script'), {
      async: true,
      importance: 'low',
      src: 'https://vk.com/js/api/openapi.js?169',
      onload,
      onerror,
      onabort: onerror,
    }));
  }

  context.VK.pending = [] as TargetType[];
  sendTarget = (event) => {
    context.VK.pending.push(event);

    let next = event;

    try {
      while (context.VK.pending.length > 0) {
        next = context.VK.pending.pop() as TargetType;
        // eslint-disable-next-line new-cap
        context.VK.Retargeting.Event(next);
      }
    } catch {
      // re-push
      context.VK.pending.push(next);
    }
  };
}

export { sendTarget };