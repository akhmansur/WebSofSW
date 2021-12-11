import React from "react";
import { SimpleCommand } from "../../lib/commands";
import { LocalStorage } from "../../lib/storage";
import { $ } from "../../lib/utils";
import { settingsService, swipeService } from "../../store/services/services";
import "./Settings.scss";

type SettingsProps = {
  isActive: boolean;
};

type SettingsState = {
  theme: string;
  backdropActive: boolean;
  colors: ColorsState;
};
type ColorsState = {
  bg: string | null;
  textColor: string | null;
  navbarTopGradient: LinearGradientColors | null;
  navbarBottomGradient: LinearGradientColors | null;
  message: string | null;
  messageSelf: string | null;
  [key: string]: string | LinearGradientColors | null;
};
type LinearGradientColors = {
  top: string;
  bottom: string;
};

export class Settings extends React.Component<SettingsProps, SettingsState> {
  initialColors: ColorsState = {
    bg: null,
    textColor: null,
    navbarTopGradient: null,
    navbarBottomGradient: null,
    message: null,
    messageSelf: null,
  };
  state: SettingsState = {
    theme: settingsService.settings.get().theme,
    backdropActive: false,
    colors: this.initialColors,
  };
  styles = window.getComputedStyle(document.documentElement);

  componentDidMount() {
    const currentTheme: string = settingsService.settings.get().theme;
    const colors = getColorsFromLS(currentTheme) || {};
    this.setState(
      (prevState) => {
        return {
          ...prevState,
          theme: currentTheme,
          backdropActive: swipeService.backdropActive.get(),
          colors: {
            ...prevState.colors,
            bg: window
              .getComputedStyle(document.documentElement)
              .getPropertyValue(`--theme-${this.state.theme}-bg`)
              .trim(),
            ...colors,
          },
        };
      },
      () => this.setTheme(this.state.theme)
    );

    swipeService.backdropActive.subscribe((val: boolean) =>
      this.setState((prevState) => {
        return { ...prevState, backdropActive: val };
      })
    );
    settingsService.settings.subscribe((val) =>
      this.setState((prevState) => {
        return { ...prevState, theme: val.theme };
      })
    );
  }

  componentDidUpdate() {
    let htmlClassName = $("html")?.classList;
    if (htmlClassName) htmlClassName.value = this.state.theme;
  }

  handleThemeChange(e: any, theme: string) {
    settingsService.setSettings({ ...settingsService.settings.get(), theme });
    this.setState({
      colors: {
        ...this.state.colors,
        bg: window
          .getComputedStyle(document.documentElement)
          .getPropertyValue(`--theme-${theme}-bg`)
          .trim(),
      },
    });
    LocalStorage.getInstance().setItem("currentTheme", theme);
    SimpleCommand.Execute("SETTINGS swtheme");
  }

  setTheme(theme: string) {
    /* This method should be called to initialize, update, or remove user custom theme variables.
       It essentially adds a new style script in the head of the page (thus lower than the html
       defaults), which in turn applies the new styles to all theme variables
    */

    let el = window.themeStylesEl
      ? window.themeStylesEl
      : document.createElement("style");
    if (!window.themeStylesEl) {
      window.themeStylesEl = el;
      document.head.appendChild(window.themeStylesEl);
    }
    let themeVars = [];
    const keys = Object.keys(this.state.colors);
    for (const res of keys) {
      const el: string | LinearGradientColors | null = this.state.colors[res];
      if (el) {
        if (typeof el !== "string")
          themeVars.push(
            `--theme-${theme}-${res}: linear-gradient(0deg,${el.top} 0%,${el.bottom} 100%);`
          );
        else themeVars.push(`--theme-${theme}-${res}: ${el};`);
      }
    }
    window.themeStylesEl.innerHTML = `
      html {
        ${themeVars.join("\n")}
      }
    `;
  }

  render() {
    return (
      <div
        className={
          "backdrop" + (swipeService.backdropActive.get() ? " active" : "")
        }
        onClick={(e: any) => {
          if (e.target.classList.contains("backdrop"))
            swipeService.toggleBackdropActive();
        }}
      >
        <div className="settings">
          <p className="settings-title">Настройки</p>
          <div className="theme-buttons">
            <span>Тема: </span>
            <button
              className={
                "light" + (this.state.theme === "light" ? " active" : "")
              }
              onClick={(e) => this.handleThemeChange(e, "light")}
            >
              Light
            </button>
            <button
              className={
                "dark" + (this.state.theme === "dark" ? " active" : "")
              }
              onClick={(e) => this.handleThemeChange(e, "dark")}
            >
              Dark
            </button>
          </div>
          <br />
          <div className="color-box">
            <label htmlFor="bg-color">Цвет фона: </label>
            <input
              type="color"
              value={this.state.colors.bg || "#FFFFFF"}
              id="bg-color"
              onChange={(e) => {
                this.setState({
                  colors: { ...this.state.colors, bg: e.target.value },
                });
                this.setTheme(this.state.theme);
              }}
            />
          </div>
          <div className="color-box">
            Цвет текста:{" "}
            <input
              type="color"
              value={this.state.colors.textColor || "#FFFFFF"}
              onChange={(e) => {
                this.setState((prevState) => {
                  return {
                    ...prevState,
                    colors: { ...prevState.colors, textColor: e.target.value },
                  };
                });
              }}
            />
          </div>
          <div className="color-box">
            Градиент верхней панели:{" "}
            <input
              type="color"
              value={this.state.colors.navbarTopGradient?.top || "#FFFFFF"}
              onChange={(e) => {
                this.setState({
                  colors: {
                    ...this.state.colors,
                    navbarTopGradient: {
                      top: e.target.value,
                      bottom:
                        this.state.colors.navbarTopGradient?.bottom ||
                        e.target.value,
                    },
                  },
                });
              }}
            />
            <input
              type="color"
              value={this.state.colors.navbarTopGradient?.bottom || "#FFFFFF"}
              onChange={(e) => {
                this.setState({
                  colors: {
                    ...this.state.colors,
                    navbarTopGradient: {
                      top:
                        this.state.colors.navbarTopGradient?.top || e.target.value,
                      bottom: e.target.value,
                    },
                  },
                });
              }}
            />
          </div>
          <div className="color-box">
            Градиент нижней панели:{" "}
            <input
              type="color"
              value={this.state.colors.navbarBottomGradient?.top || "#FFFFFF"}
              onChange={(e) => {
                this.setState({
                  colors: {
                    ...this.state.colors,
                    navbarBottomGradient: {
                      top: e.target.value,
                      bottom:
                        this.state.colors.navbarBottomGradient?.bottom ||
                        e.target.value,
                    },
                  },
                });
              }}
            />
            <input
              type="color"
              value={
                this.state.colors.navbarBottomGradient?.bottom || "#FFFFFF"
              }
              onChange={(e) => {
                this.setState({
                  colors: {
                    ...this.state.colors,
                    navbarBottomGradient: {
                      top: this.state.colors.navbarBottomGradient?.top || e.target.value,
                      bottom: e.target.value,
                    },
                  },
                });
              }}
            />
          </div>
          <div className="color-box">
            Цвет фона сообщений:{" "}
            <input
              type="color"
              value={this.state.colors.message || "#FFFFFF"}
              onChange={(e) => {
                this.setState({
                  colors: { ...this.state.colors, message: e.target.value },
                });
              }}
            />
          </div>
          <div className="color-box">
            Цвет фона своих сообщений:{" "}
            <input
              type="color"
              value={this.state.colors.messageSelf || "#FFFFFF"}
              onChange={(e) => {
                this.setState({
                  colors: { ...this.state.colors, messageSelf: e.target.value },
                });
              }}
            />
          </div>
          <div className="save-buttons">
            <div
              className="accept"
              onClick={() => {
                this.setTheme(this.state.theme);
                saveColorsToLS(this.state.colors, this.state.theme);
              }}
            >
              Применить
            </div>
            <div
              className="reset"
              onClick={() => {
                this.setState(
                  (prevState) => {
                    return { ...prevState, colors: { ...this.initialColors } };
                  },
                  () => this.setTheme(this.state.theme)
                );
                saveColorsToLS(null, this.state.theme);
              }}
            >
              Сбросить
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function saveColorsToLS(colors: ColorsState | null, theme: string) {
  const ls = LocalStorage.getInstance();

  if (colors) ls.setItem(theme, JSON.stringify(colors));
  else ls.removeItem(theme);
}

function getColorsFromLS(theme: string): ColorsState | null {
  const ls = LocalStorage.getInstance();

  const colors = ls.getItem(theme);
  if (colors) return JSON.parse(colors || "");
  else return null;
}
