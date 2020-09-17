import {Observable} from 'rxjs';

export function createHttpObservable(url: string) : Observable<any> {
  return new Observable((observer) => {
    const abortController = new AbortController();
    const {signal} = abortController;

    fetch(url, {signal})
      .then(async (response) => {
        const body = await response.json();
        observer.next(body);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });

      return () => abortController.abort();
  });
}
