"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomePage;
const navigation_1 = require("next/navigation");
function HomePage() {
    // Redirect to dashboard by default
    (0, navigation_1.redirect)('/dashboard');
}
//# sourceMappingURL=page.js.map