export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b0f1a",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Arial, sans-serif",
      flexDirection: "column",
      gap: "12px",
      textAlign: "center",
      padding: "24px"
    }}>
      <div style={{fontSize: 24, fontWeight: 700}}>网站已运行 ✅</div>
      <div>这是最小可运行版本（纯 React，无额外依赖）。</div>
      <div>看到这段文字就说明：打包产物加载成功、JS 正常执行。</div>
    </div>
  );
}
