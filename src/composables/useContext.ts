import { type InjectionKey, provide, inject } from "vue";

export const useContext = <ContextType>(name: string) => {
  const injectionKey: InjectionKey<ContextType | null> = Symbol(name);

  const injector = () => {
    const injection = inject(injectionKey);
    if (injection) return injection;

    throw new Error(`Injection ${injectionKey.toString()} failed, insure component is inside ${name}`);
  };

  const provider = (context: ContextType) => {
    provide(injectionKey, context);
    return context;
  };

  return [injector, provider] as const;
};
