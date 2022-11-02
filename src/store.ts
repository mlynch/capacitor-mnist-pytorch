import { Store } from "pullstate";

interface State {
  ctx: CanvasRenderingContext2D | null;
  drawing: boolean;
  clear: boolean;
}
export const AppStore = new Store<State>({
  ctx: null,
  drawing: false,
  clear: false
});