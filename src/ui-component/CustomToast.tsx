import { toast } from "@heroui/react";



export const custom_add_toast = ({ title, description, timeout = 3000, shouldShowTimeoutProgress = true, variant }:any) => {
    toast.info(title,{
         actionProps: {
                children: "Dismiss",
                onPress: () => toast.clear(),
                variant: variant || "tertiary",
              },
        description,
        // timeout,

    });
}

