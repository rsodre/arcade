mod constants;
mod store;

mod models {
    mod index;
    mod game;
    mod achievement;
}

mod components {
    mod controllable;
    mod registrable;
}

#[cfg(test)]
mod tests {
    mod setup;
    mod test_controllable;
    mod test_registrable;

    mod mocks {
        mod controller;
        mod registrer;
    }
}
