import { page, pageInner } from './Page.css'

export const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={page}>
      <div className={pageInner}>{children}</div>
    </div>
  )
}
