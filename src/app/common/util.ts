import {Observable} from 'rxjs';

export function createHttpObservable(url: string) : Observable<any> {
  return new Observable((observer) => {
    const abortController = new AbortController();
    const {signal} = abortController;

    // because fetch only hits the catch block when there is a fatal error, we
    // need error handling outside of the catch block
    fetch(url, {signal})
      .then(async (response) => {
        if (response.ok) {
          const body = await response.json();
          observer.next(body);
          observer.complete();
        } else {
          console.log('error in observable');
          observer.error(`${response.statusText} | error code: ${response.status}`);
        }
      })
      .catch((err) => {
        console.log('error in observable');
        observer.error(err);
      });

      return () => abortController.abort();
  });
}

export function getLessonsQueryParams(courseId: number, searchTerm: string = '') {
  return `?courseId=${courseId}&pageSize=100` + (searchTerm ? `&filter=${searchTerm}` : '');
}
