import { useLoadScript } from '@react-google-maps/api';
import { Point } from '../hooks/useFindRoute.ts';
import { useState } from 'react';
import {
  selectAddressFrom,
  selectAddressFromText,
  selectAddressTo,
  selectAddressToText,
  updateAddressFrom,
  updateAddressFromText,
  updateAddressTo,
  updateAddressToText,
} from '../store/appReducer.ts';
import { useAppDispatch } from '../store/store.ts';
import { Input } from '../components/Input.tsx';
import { AddressInput } from '../components/AddressInput.tsx';
import { RouteMap } from '../components/RouteMap.tsx';
import { Label } from '../components/Label.tsx';
import { useSelector } from 'react-redux';
import AnimateOnRender from "../components/AnimateOnRender.tsx";

export const SelectCommutingPreferencesView = () => {
  const addressToText = useSelector(selectAddressToText);
  const addressFromText = useSelector(selectAddressFromText);
  const addressTo = useSelector(selectAddressTo);
  const addressFrom = useSelector(selectAddressFrom);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    id: '982eaad930f4790c',
    libraries: ['places'],
  });

  const [startingPoint, setStartingPoint] = useState<Point | undefined>({
    lat: addressFrom?.lat ?? 52.249472,
    lng: addressFrom?.lng ?? 21.098527,
  });
  const [destinationPoint, setDestinationPoint] = useState<Point | undefined>({
    lat: addressTo?.lat ?? 52.2323778,
    lng: addressTo?.lng ?? 20.9861998,
  });
  const [startingFromAddress, setStartingFromAddress] = useState<string>(addressFromText || '');
  const [destinationAddress, setDestinationAddress] = useState<string>(addressToText || '');
  const dispatch = useAppDispatch();

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
      <AnimateOnRender>
          <div className="flex-col max-h-full">
              <div
                  className="p-4 pb-16 flex flex-col justify-center"
                  style={{
                      height: '30vh',
                  }}
              >
                  <div className="flex-col space-y-4">
                      <Label title={'I’m going from'}>
                          <AddressInput
                              handleAddressChanged={(address) => {
                                  dispatch(updateAddressFrom(address.point));
                                  setStartingPoint(address.point);
                                  setStartingFromAddress(address.name);
                                  dispatch(updateAddressFromText(address.name));
                              }}
                          >
                              <Input
                                  placeholder={'Start typing address...'}
                                  value={startingFromAddress}
                                  onChange={setStartingFromAddress}
                              ></Input>
                          </AddressInput>
                      </Label>
                      <Label title={'To'}>
                          <AddressInput
                              handleAddressChanged={(address) => {
                                  dispatch(updateAddressTo(address.point));
                                  setDestinationPoint(address.point);
                                  setDestinationAddress(address.name);
                                  dispatch(updateAddressToText(address.name));
                              }}
                          >
                              <Input
                                  placeholder={'Add your work location...'}
                                  value={destinationAddress}
                                  onChange={setDestinationAddress}
                              ></Input>
                          </AddressInput>
                      </Label>
                  </div>
              </div>
              <RouteMap startingPoint={startingPoint} destinationPoint={destinationPoint}/>
          </div>
      </AnimateOnRender>
  );
};
