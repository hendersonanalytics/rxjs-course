import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


export enum RxJsLoggingLevel {
  TRACE,
  DEBUG,
  INFO,
  ERROR
}

let rxJsLoggingLevel = RxJsLoggingLevel.INFO;

export function setRxJsLoggingLevel(level: RxJsLoggingLevel) {
  rxJsLoggingLevel = level;
}

export function debug(level: number, message: string) {
  return (source: Observable<any>) => {
    return source.pipe(
      tap(val => {
        if (level >= rxJsLoggingLevel) {
          console.log(`${message}: ${JSON.stringify(val)}`);
        }
      })
    );
  }
}
