import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { DI, DIProps } from '../../Core';
import { ShowLogOutScreen } from './Panel/index';
import ScrollToTop from './ScrollToTop';

// import {
//     Button,
//     Card,
//     FlexLayout,
//     Notification as Note,
//     Select,
//     TextStyles
// } from '@cedcommerce/ounce-ui';
import { StoreDispatcher } from '../..';
import {
    loginStatus,
    syncConnectorInfo,
    syncNecessaryInfo,
    syncProfileInfo,
    syncServices
} from '../../Actions';
import { capitalizeFirstLetter } from './Function';
// import { Menu, SubMenu } from './Panel/Menu';

import { PlusCircle } from 'react-feather';
import { PanelLayout } from '../layout';
import Activities from './activities/Activities';
import Configurations from './Configurations/Configurations';
import Dashboard from './Dashboard/Dashboard';
import Faq from './help/Faq';
import Order from './order/Order';
import ReturnViewOrders from './order/OrderReturn/components/ReturnViewOrders';
import OrderReturn from './order/OrderReturn/OrderReturn';
import OrderView from './order/OrderView';
import Pricing from './pricing/Pricing';
import ProductEdit from './products/EditProduct/ProductEdit';
import ProductListing from './products/Listing';
import Products from './products/productListing/Products';
import Create from './profile/Create';
import ProfileGrid from './profile/ProfileGrid';
// import { PanelHeader } from '../shared';
export interface PanelProps extends DIProps {
    name?: string;
    syncNecessaryInfo: () => void;
    syncConnectorInfo: (props: any, shop_url?: string | null) => void;
    syncProfileInfo: () => void;
    loginStatus: () => void;
    syncServices: () => void;
}

function Panel(props: PanelProps): JSX.Element {
    const [hasBeenCalled, setHasBeenCalled] = useState(false);
    const dispatcher = useContext(StoreDispatcher);
    const { LOGIN_STATUS = { status: 'LOGIN' } } = props.redux;
    const [navigateKeyPress, setNavigateKeyPress] = useState<any>(null);

    useEffect(() => {
        dispatcher({
            type: 'user_id',
            state: {
                user_id: props.match.uId,
            },
        });
        con();
    }, [props.match.uId, props.di.globalState.get('shop')]);

    // handle key press and navigate accordingly

    useEffect(() => {
        document.addEventListener('keydown', (event: any) => {
            if (event.target.tagName == 'INPUT') {
                return true;
            } else {
                setNavigateKeyPress(event.key.toUpperCase());
            }
        });
    }, []);

    useMemo(() => {
        switch (navigateKeyPress) {
            case "D": props.history('dashboard'); break;
            case "P": props.history('product-listing'); break;
            case "T": props.history('profile'); break;
            case "S": props.history('settings'); break;
            case "H": props.history('faq'); break;
            case "N": props.history('activities'); break;
            case "O": props.history('order'); break;
            case "M": props.history('pricing'); break;
        }
    }, [navigateKeyPress]);

    // if (LOGIN_STATUS.status === 'LOGOUT') {
    //     return <ShowLogOutScreen {...props} {...LOGIN_STATUS} />;
    // }

    function con(): void {
        /****  pause for now, if we need step data data on redux level, un-comment it /****/
        // props.syncNecessaryInfo(); //ADD AWAIT DURING PRODUCTION

        const shop = props.di.globalState.get(`shop`);
        // myshopify_domain: "gaurav-fb.myshopify.com"
        props.syncConnectorInfo(props, shop); //Don't add AWAIT DURING PRODUCTION

        /****  pause for now, if we need profile data on redux level, un-comment it /****/
        // props.syncProfileInfo();

        /****  pause for now, if we need services data on redux level, un-comment it /****/
        //props.syncServices();
        setHasBeenCalled(true);
    }

    let BodyRender = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onChange(e: any): void {
        if (e.path.includes('https:')) window.open(e.path);
        else props.history(e.path);
    }

    function getCurrentPath(path: string) {
        const newpAth = '/' + path.split('/')[1] + '/' + path.split('/')[3];
        return newpAth;
    }

    // if (stepStatus !== '_COMPLETED_') {
    //     BodyRender = (
    //         // <Onboarding
    //         //     updateStepStatus={updateStepStatus}
    //         //     setGeneralData={setGeneralData}
    //         // />
    //         <>Onboarding steps rendering...</>
    //     );
    // } else {
    BodyRender = renderApp();
    // }

    // return (
    //     <>
    //         {hasBeenCalled && props.redux?.loaded ? (
    //             BodyRender
    //         ) : (
    //             <Loader title="" />
    //         )}
    //     </>
    // );
    console.log("Pane exe");


    return BodyRender;

    function renderApp(): JSX.Element {
        return (
            <>
                <PanelLayout>
                    <Routes>
                        <Route path="dashboard" element={<h1>Dashboard</h1>} />
                        <Route path="product/*" element={<h1>Product List</h1>} />
                        <Route path="product/product-view" element={<h1>Product-view</h1>} />
                        <Route path="product/product-edit" element={<h1>Product-edit</h1>} />
                        <Route path="order/*" element={<h1>Order List</h1>} />
                        <Route path="order/order-view" element={<h1>Order view</h1>} />

                        <Route path="activities" element={<h1>activities Section</h1>} />


                        <Route
                            path="*"
                            element={
                                <Navigate to="dashboard" />
                            }
                        />
                    </Routes>
                </PanelLayout>
            </>
        );
    }
}


export default DI(Panel, {
    func: {
        syncNecessaryInfo,
        syncConnectorInfo,
        syncProfileInfo,
        loginStatus,
        syncServices,
    },
});
