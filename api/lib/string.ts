export const isMaxLength = (len: number) => (str: string): boolean => str.length < len
export const isMinLength = (len: number) => (str: string): boolean => str.length > len
