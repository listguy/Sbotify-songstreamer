import mixpanel from "mixpanel-browser";
const { REACT_APP_MIXPANEL_TOKEN } = process.env;
console.log(REACT_APP_MIXPANEL_TOKEN);
mixpanel.init(REACT_APP_MIXPANEL_TOKEN);

let env_check = process.env.NODE_ENV === "production" || true; //right now i want to track dev too.

let actions = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;
