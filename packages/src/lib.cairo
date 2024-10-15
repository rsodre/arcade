mod constants;
mod store;

mod models {
    mod index;
    mod game;
    mod achievement;
}

mod events {
    mod index;
    mod creation;
    mod completion;
}

mod components {
    mod achievable;
    mod controllable;
    mod registrable;
}

#[cfg(test)]
mod tests {
    mod setup;
    mod test_achievable;

    mod mocks {
        mod achiever;
    }
}
