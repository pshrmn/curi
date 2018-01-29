declare module "react-broadcast" {
  export interface ProviderProps {
    value: any;
    children: React.ReactNode;
  }
  export interface ConsumerProps {
    children: (value: any) => React.ReactNode
  }

  
  export interface Context {
    Provider: React.ComponentClass<ProviderProps>;
    Consumer: React.ComponentClass<ConsumerProps>;
  }

  export function createContext(value: any): Context;
}
