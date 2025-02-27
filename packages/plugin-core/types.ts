import type { Plugin, IPlugin } from "./plugin";

export type PluginHook = {
  tap: (name: string, fn: (config: any) => void) => void;
};

export type CodeLifeCycleContext = {
  hooks: {
    afterVanillaCSSBundle: PluginHook;
  };
};

export type UseCodePluginByPresetNameSpec = string;

export type UseCodePluginByPresetNameAndParamsForInlineJsonUseSpec<
  K extends string,
  P extends object
> = [K, P];

export type UseCodePluginByPresetNameForInlineJsonUseSpec<
  K extends string = string
> = [K];

export type TPlugin =
  | UseCodePluginByPresetNameSpec
  | UseCodePluginByPresetNameAndParamsForInlineJsonUseSpec<any, any>
  | UseCodePluginByPresetNameForInlineJsonUseSpec
  | IPlugin
  | Plugin;
