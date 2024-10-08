export const F_PUBLIC = 'public'
export const F_UNAUTHORIZED = 'unauthorized'
export const F_PROTECTED = 'protected'

type AccessType = typeof F_PUBLIC | typeof F_UNAUTHORIZED | typeof F_PROTECTED

export default AccessType
