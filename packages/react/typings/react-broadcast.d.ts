declare module "react-broadcast" {
  export interface ProviderProps {
    value: any;
    children: React.ReactNode;
  }
  export interface ConsumerProps<T> {
    children: (value: T) => React.ReactNode
  }
   
  export interface Context<T> {
    Provider: React.ComponentClass<ProviderProps>;
    Consumer: React.ComponentClass<ConsumerProps<T>>;
  }

  export function createContext<T>(value: any): Context<T>;
}
