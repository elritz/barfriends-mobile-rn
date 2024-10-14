import { Heading } from "#/src/components/ui/heading";
import { HStack } from "#/src/components/ui/hstack";
import { Button, ButtonText } from "#/src/components/ui/button";
import {
  useGetLiveVenueTotalsV2Query,
  useRefreshDeviceManagerQuery,
  useRemovePersonalJoinsVenue2Mutation,
} from "#/graphql/generated";
import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

export default function LeaveSection() {
  const params = useGlobalSearchParams();
  const [isJoined, setIsJoined] = useState(false);
  const {
    data: rdmData,
    loading: rdmLoading,
    error: rdmError,
  } = useRefreshDeviceManagerQuery({
    fetchPolicy: "cache-first",
  });

  const {
    data: glvtData,
    loading: glvtLoading,
    error: glvtError,
  } = useGetLiveVenueTotalsV2Query({
    skip: !String(params.venueProfileId),
    fetchPolicy: "cache-first",
    variables: {
      profileIdVenue: String(params.venueProfileId),
    },
    onCompleted: async (data) => {
      if (data.getLiveVenueTotalsV2.__typename === "LiveVenueTotals2") {
        data.getLiveVenueTotalsV2.out?.some((item) => {
          if (
            data.getLiveVenueTotalsV2.__typename === "LiveVenueTotals2" &&
            rdmData?.refreshDeviceManager.__typename ===
              "AuthorizationDeviceProfile"
          ) {
            if (
              item.personalProfileId ===
              rdmData?.refreshDeviceManager.Profile?.id
            ) {
              setIsJoined(true);
            }
          }
        });
      }
    },
  });

  const [
    removePersonalJoinsVenueMutation,
    { data: JVData, loading: JVLoading, error: JVError },
  ] = useRemovePersonalJoinsVenue2Mutation({
    variables: {
      profileIdVenue: String(params.venueProfileId),
    },
    update: (cache, { data }) => {
      if (
        glvtData?.getLiveVenueTotalsV2.__typename === "LiveVenueTotals2" &&
        rdmData?.refreshDeviceManager.__typename ===
          "AuthorizationDeviceProfile" &&
        data?.removePersonalJoinsVenue2.__typename === "LiveVenueTotals2"
      ) {
        if (data?.removePersonalJoinsVenue2?.updateOut?.id) {
          if (
            rdmData?.refreshDeviceManager?.Profile?.Personal?.LiveOutPersonal
          ) {
            const tobeRemoved = cache.identify(
              data.removePersonalJoinsVenue2.updateOut,
            );
            if (tobeRemoved) {
              cache.modify({
                id: cache.identify(
                  rdmData.refreshDeviceManager.Profile?.Personal
                    ?.LiveOutPersonal,
                ),
                fields: {
                  Out(existingItemsRefs, { toReference }) {
                    return existingItemsRefs.filter(
                      (itemRef) => itemRef === toReference(tobeRemoved),
                    );
                  },
                },
              });
            }
          }
        }
      }

      if (
        data?.removePersonalJoinsVenue2.__typename === "LiveVenueTotals2" &&
        rdmData?.refreshDeviceManager.__typename ===
          "AuthorizationDeviceProfile"
      ) {
        setIsJoined(false);
        if (data.removePersonalJoinsVenue2.updateOut?.id) {
          const tobeRemoved = cache.identify(
            data.removePersonalJoinsVenue2.updateOut,
          );
          if (tobeRemoved) {
            cache.modify({
              id: cache.identify(data.removePersonalJoinsVenue2),
              fields: {
                joined: () =>
                  data.removePersonalJoinsVenue2.__typename ===
                    "LiveVenueTotals2" && data.removePersonalJoinsVenue2.joined
                    ? data.removePersonalJoinsVenue2.joined
                    : 0,
                totaled: () =>
                  data.removePersonalJoinsVenue2.__typename ===
                    "LiveVenueTotals2" && data.removePersonalJoinsVenue2.totaled
                    ? data.removePersonalJoinsVenue2.totaled
                    : 0,
                out(existingItemsRefs, { toReference }) {
                  return existingItemsRefs.filter(
                    (itemRef) => itemRef === toReference(tobeRemoved),
                  );
                },
              },
            });
          }
        }
      }
    },
  });

  useEffect(() => {
    if (
      glvtData &&
      glvtData.getLiveVenueTotalsV2.__typename === "LiveVenueTotals2"
    ) {
      if (glvtData.getLiveVenueTotalsV2.out?.length) {
        glvtData.getLiveVenueTotalsV2.out?.some((item) => {
          if (item.type === "JOIN") {
            if (
              glvtData.getLiveVenueTotalsV2.__typename === "LiveVenueTotals2" &&
              rdmData?.refreshDeviceManager.__typename ===
                "AuthorizationDeviceProfile"
            ) {
              if (
                item.personalProfileId ===
                rdmData?.refreshDeviceManager.Profile?.id
              ) {
                setIsJoined(true);
              } else {
                setIsJoined(false);
              }
            }
          }
        });
      } else {
        setIsJoined(false);
      }
    }
  }, [glvtData]);

  if (rdmData?.refreshDeviceManager.__typename === "Error") {
    return null;
  }

  if (
    rdmData?.refreshDeviceManager.__typename === "AuthorizationDeviceProfile"
  ) {
    if (!isJoined) return null;
    return (
      <HStack className="mt-3 w-full justify-between px-3">
        <HStack className="items-center">
          <Heading
            numberOfLines={1}
            className="text-md leading-20 h-[20px] font-black uppercase"
          >
            You're joined{"\n"}
          </Heading>
        </HStack>
        <Button
          onPress={() => {
            removePersonalJoinsVenueMutation();
          }}
          size="sm"
          variant="outline"
          isDisabled={!isJoined || JVLoading}
          className="justify-between rounded-md"
        >
          <ButtonText>{JVLoading ? "Leaving" : "Leave"}</ButtonText>
        </Button>
      </HStack>
    );
  }
}
