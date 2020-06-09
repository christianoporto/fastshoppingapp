import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ProductListViewPage from "./pages/ProductListViewPage";
import LoadingDualRing from "./animations/LoadingDualRing";
import AppContainer from "./containers/AppContainer";
import ProductContextProvider from "./store/contexts/ProductContext";
import CurrentOrderPage from "./pages/CurrentOrderPage";
import CurrentOrderContextProvider from "./store/contexts/CurrentOrderContext";
import CheckoutPage from "./pages/CheckoutPage";

const ContextProviders = ({ children }: any) => {
    return (
        <CurrentOrderContextProvider>
            <ProductContextProvider>{children}</ProductContextProvider>
        </CurrentOrderContextProvider>
    );
};

export const App = () => {
    return (
        <ContextProviders>
            <Suspense fallback={<LoadingDualRing center={true} className="mt-3" />}>
                <BrowserRouter>
                    <Switch>
                        <AppContainer>
                            <Route path="/myorder" component={CurrentOrderPage} />
                            <Route path="/checkout" component={CheckoutPage} />
                            <Route exact path="/" component={ProductListViewPage} />
                        </AppContainer>
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </ContextProviders>
    );
};
export default App;
