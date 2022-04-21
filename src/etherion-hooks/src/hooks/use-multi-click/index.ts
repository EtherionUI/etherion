import { useEffect } from "react";

export interface UseMultiClickProps {
  ref: any;
  actions: Array<any>;
  latency: number;
}

const useMultiClick = ({ ref, latency = 500, actions }: UseMultiClickProps) => {
  useEffect(() => {
    const clickRef = ref.current;
    const actionsLength = actions.length;
    console.log(actionsLength, "aclen");
    let clickCount = 0;
    const handleClick = (event: any) => {
      clickCount += 1;
      console.log(clickCount);
      setTimeout(() => {
        if (clickCount <= actionsLength) {
          if (actions[clickCount - 1]) {
            actions[clickCount - 1](event);
            console.log("aaaaaaaaa");
          } else {
            for (let i = clickCount - 2; i >= 0; --i) {
              if (actions[i]) {
                actions[i](event);
                break;
              }
            }
          }
        } else {
          for (let i = actionsLength - 1; i >= 0; --i) {
            if (actions[i]) {
              actions[i](event);
              break;
            }
          }
        }

        clickCount = 0;
      }, latency);
    };

    clickRef?.addEventListener("click", handleClick);
    return () => {
      clickRef?.removeEventListener("click", handleClick);
    };
  }, [actions, latency, ref]);
};

export default useMultiClick;
