package io.commuty.route.domain;

import org.springframework.stereotype.Component;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

@Component
public class Matcher {

    private final RouteRepository routeRepository;

    public Matcher(RouteRepository routeRepository) {
        this.routeRepository = routeRepository;
    }

    public List<Route> matchFor(String authenticated) {
        final var routes = routeRepository.findRoutesFor(authenticated);
        return routes.stream()
                .map(route -> matchRouteFor(route.from(), route.day(), route.hour(), route.ridePreference()))
                .flatMap(List::stream)
                .filter(route -> !route.user().equals(authenticated))
                .toList();
    }

    private List<Route> matchRouteFor(Address address, DayOfWeek day, LocalTime hour, RidePreference ridePreference) {
        return routeRepository.findMatchedRoutes(
                address.longitude(),
                address.latitude(),
                address.levelOfDetail(),
                day,
                hour,
                ridePreference);
    }
}
