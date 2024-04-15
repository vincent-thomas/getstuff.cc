
// declare global {
//   // eslint-disable-next-line @typescript-eslint/prefer-namespace-keyword, @typescript-eslint/no-namespace
//   module NodeJS {
//     interface Global {
//       ee: import("events").EventEmitter
//     }
//   }
// }

import EventEmitter from "events";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-var
declare var ee: EventEmitter;


export {}



// globalThis.ee