import { _ as _export_sfc, C as resolveComponent, o as openBlock, c as createElementBlock, j as createBaseVNode, a as createTextVNode, E as createVNode } from "./chunks/framework.Czh-DTzK.js";
const __pageData = JSON.parse('{"title":"4-Ch Knob Line Follower","description":"","frontmatter":{},"headers":[],"relativePath":"docs/index.md","filePath":"docs/index.md"}');
const _sfc_main = { name: "docs/index.md" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_KitVersionGuide = resolveComponent("KitVersionGuide");
  return openBlock(), createElementBlock("div", null, [
    _cache[0] || (_cache[0] = createBaseVNode("h1", {
      id: "_4-ch-knob-line-follower",
      tabindex: "-1"
    }, [
      createTextVNode("4-Ch Knob Line Follower "),
      createBaseVNode("a", {
        class: "header-anchor",
        href: "#_4-ch-knob-line-follower",
        "aria-label": 'Permalink to "4-Ch Knob Line Follower"'
      }, "​")
    ], -1)),
    _cache[1] || (_cache[1] = createBaseVNode("div", { class: "note custom-block github-alert" }, [
      createBaseVNode("p", { class: "custom-block-title" }, "NOTE"),
      createBaseVNode("p"),
      createBaseVNode("p", null, "Select the GPIO or I2C version for your module. You can switch versions anytime using the Version menu in the navigation bar.")
    ], -1)),
    createVNode(_component_KitVersionGuide)
  ]);
}
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export {
  __pageData,
  index as default
};
