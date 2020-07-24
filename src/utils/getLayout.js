export default function licence(layout_in) {
    if (layout_in == "post") {
        var contentLayout = "Artikel"
      } else {
        var contentLayout = layout_in
      }
      return contentLayout
}