import { useEffect, useState } from "react";
import { Observable } from "../observable/Observable";

export function useObservable<T>(observable: Observable<T>): T {
  const [val, setVal] = useState(observable.get())

  useEffect(() => {
    setVal(observable.get())
    return observable.subscribe(setVal)
  },[observable])
  
  return val;
}
