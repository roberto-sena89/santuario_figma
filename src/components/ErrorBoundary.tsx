import { Component, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * ErrorBoundary — captura erros de render e mostra um painel legível
 * em vez de uma tela preta/blank. Sempre loga o erro no console.
 */
export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error("[Santuário] Erro de render:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div
          className="min-h-screen bg-background flex items-center justify-center px-4"
          role="alert"
        >
          <div className="max-w-lg w-full bg-card border border-error/40 rounded-2xl p-6 sm:p-8 text-center">
            <p className="text-error font-semibold text-lg mb-2">
              Algo deu errado nesta seção
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Ocorreu um erro inesperado ao exibir o conteúdo. A mensagem abaixo
              ajuda a identificar a causa.
            </p>
            <pre className="text-left text-xs text-error/80 bg-error/10 border border-error/20 rounded-lg p-3 overflow-x-auto whitespace-pre-wrap break-words mb-5">
              {this.state.error.message}
            </pre>
            <button
              onClick={() => {
                this.setState({ error: null });
                window.location.hash = "#/";
                window.location.reload();
              }}
              className="inline-flex items-center justify-center rounded-full border border-[#D4A24C]/45 bg-gradient-to-r from-[#D4A24C]/20 to-[#C4933C]/12 px-5 py-2.5 text-sm font-semibold text-[#D4A24C] shadow-md shadow-black/20 transition-all duration-200 hover:border-[#D4A24C]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Voltar ao início
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
